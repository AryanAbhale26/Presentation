// Editor/Index.tsx
import React, { useEffect, useRef, useState } from "react";
import Outline, { type Project } from "../outline/Index";
import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";

import OutlineSection from "../../../components/custom/OutlineSection";
import {
  firebaseDb,
  GeminiAiLiveModel,
  GeminiAiModel,
} from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { image_pr } from "../../../assets/prompt";
import SliderFrame from "../../../components/custom/SliderFrame";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";

const Editor = () => {
  const pptx = new PptxGenJS();
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const [sliders, setSliders] = useState<any>([]);
  const [isSlidesGenerated, setIsSlidesGenerated] = useState<any>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    projectId && GetProjectDetail();
  }, [projectId]);

  const GetProjectDetail = async () => {
    setLoading(true);
    const docRef = doc(firebaseDb, "project", projectId ?? "");
    const docSnap: any = await getDoc(docRef);
    if (!docSnap.exists()) {
      return;
    }
    console.log(JSON.stringify(docSnap.data()));
    setProjectDetail(docSnap.data());
    setLoading(false);
  };

  useEffect(() => {
    if (projectDetail && !projectDetail?.slides?.length) {
      GenerateSlides();
    } else {
      setSliders(projectDetail?.slides);
    }
  }, [projectDetail]);

  const GenerateSlides = async () => {
    if (!projectDetail?.outline || projectDetail.outline.length === 0) return;

    console.log("Starting slide generation...");

    for (let index = 0; index <= projectDetail.outline.length; index++) {
      const metaData = projectDetail.outline[index];
      const prompt = image_pr
        .replace(
          "{DESIGN_STYLE}",
          projectDetail?.designStyle?.designGuide ?? ""
        )
        .replace(
          "{COLORS_CODE}",
          JSON.stringify(projectDetail?.designStyle?.colors)
        )
        .replace("{METADATA}", JSON.stringify(metaData));

      console.log("📝 Generating slide", index + 1);
      await GeminiSlideCall(prompt, index);
      console.log("✅ Finished slide", index + 1);
    }

    console.log("🎉 All slides generated!");
    setIsSlidesGenerated(Date.now());
  };

  const GeminiSlideCall = async (prompt: string, index: number) => {
    try {
      const session = await GeminiAiLiveModel.connect();
      await session.send(prompt);

      let text = "";

      for await (const message of session.receive()) {
        if (message.type === "serverContent") {
          const parts = message.modelTurn?.parts;
          if (parts && parts.length > 0) {
            text += parts?.map((p) => p.text).join("");

            const finalText = text
              .replace(/```html/g, "")
              .replace(/```/g, "")
              .trim();

            setSliders((prev: any[]) => {
              const updated = prev ? [...prev] : [];
              updated[index] = { code: finalText };
              return updated;
            });
          }

          if (message.turnComplete) {
            console.log(" Slide", index + 1, "complete");
            break;
          }
        }
      }

      session.close();
    } catch (err) {
      console.error("❌ Error generating slide", index + 1, err);
    }
  };

  useEffect(() => {
    if (isSlidesGenerated) SaveAllSlides();
  }, [isSlidesGenerated]);

  const SaveAllSlides = async () => {
    await setDoc(
      doc(firebaseDb, "project", projectId ?? ""),
      {
        slides: sliders,
      },
      {
        merge: true,
      }
    );
    console.log("Slides saved to database");
  };

  const updateSliderCode = async (updateSlideCode: string, index: number) => {
    setSliders((prev: any) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        code: updateSlideCode,
      };
      return updated;
    });

    // Save updated slide to database immediately
    const updatedSlides = [...sliders];
    updatedSlides[index] = {
      ...updatedSlides[index],
      code: updateSlideCode,
    };

    await setDoc(
      doc(firebaseDb, "project", projectId ?? ""),
      {
        slides: updatedSlides,
      },
      {
        merge: true,
      }
    );
    console.log("💾 Updated slide", index + 1, "saved to database");
  };

  const exportAllIframesToPPT = async () => {
    if (!containerRef.current) return;
    setDownloadLoading(true);

    // Save all current slides to database before export
    await setDoc(
      doc(firebaseDb, "project", projectId ?? ""),
      {
        slides: sliders,
      },
      {
        merge: true,
      }
    );

    const pptx = new PptxGenJS();
    const iframes = containerRef.current.querySelectorAll("iframe");

    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i] as HTMLIFrameElement;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) continue;

      const slideNode = iframeDoc.querySelector("body > div") || iframeDoc.body;
      if (!slideNode) continue;

      console.log(`📸 Exporting slide ${i + 1}...`);

      try {
        const canvas = await html2canvas(slideNode as HTMLElement, {
          allowTaint: true,
          useCORS: true,
          scale: 2,
          backgroundColor: null,
          logging: false,
        });

        const dataUrl = canvas.toDataURL("image/png");

        const slide = pptx.addSlide();
        slide.addImage({
          data: dataUrl,
          x: 0,
          y: 0,
          w: 10,
          h: 5.625,
        });
      } catch (error) {
        console.error(`❌ Error exporting slide ${i + 1}:`, error);
      }
    }

    setDownloadLoading(false);
    pptx.writeFile({
      fileName: `${projectDetail?.projectId || "MyProject"}.pptx`,
    });
    console.log("PPT downloaded successfully");
  };

  return (
    <div className="grid grid-cols-5 px-10">
      <div className="col-span-2 h-screen overflow-auto scrollbar-hide">
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          loading={loading}
        />
      </div>
      <div
        ref={containerRef}
        className="col-span-3 h-screen overflow-auto scrollbar-hide"
      >
        {(sliders ?? []).map((slide: any, index: number) => (
          <SliderFrame
            slide={slide}
            key={index}
            slideIndex={index}
            colors={projectDetail?.designStyle?.colors}
            updateSlider={(html) => updateSliderCode(html, index)}
          />
        ))}
      </div>
      {/* Export button */}
      <Button
        onClick={exportAllIframesToPPT}
        size={"lg"}
        className=" bg-red-500 fixed bottom-6 transform left-1/2 -translate-x-1/2 cursor-pointer hover:bg-red-700"
        disabled={downloadLoading}
      >
        {downloadLoading ? <Loader2 className="animate-spin" /> : <FileDown />}{" "}
        Export PPT
      </Button>
    </div>
  );
};

export default Editor;
