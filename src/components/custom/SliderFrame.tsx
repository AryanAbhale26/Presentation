import { useParams } from "react-router-dom";
import { HTMLTEM } from "../../assets/prompt";
import React, { useEffect, useRef, useState } from "react";
import { GeminiAiModel } from "@/config/FirebaseConfig";
import FloatingActionTool from "./FloatingActionTool";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

const HTML_DEFAULT = HTMLTEM;

type props = {
  slide: { code: string };
  colors: any;
  updateSlider: (html: string) => void;
  slideIndex: number;
};

const SliderFrame = ({ slide, colors, updateSlider, slideIndex }: props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const selectedElRef = useRef<HTMLElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const FINAL_CODE = HTML_DEFAULT.replace(
    "{colorCodes}",
    JSON.stringify(colors)
  ).replace("{code}", slide?.code);

  /** ✅ Save current iframe content to database */
  const saveCurrentContent = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;

    const updatedHTML = iframe.contentDocument.body.innerHTML;
    updateSlider(updatedHTML);
    setHasChanges(false);
    console.log(`💾 Slide ${slideIndex + 1} saved manually`);
  };

  /** ✅ Load slide + inline editing */
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(FINAL_CODE);
    doc.close();

    const init = () => {
      const body = doc.body;
      if (!body) return;

      body.style.userSelect = "text";

      let selectedEl: HTMLElement | null = null;

      const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        const t = e.target as HTMLElement;

        if (selectedEl && selectedEl !== t) {
          selectedEl.style.outline = "";
          selectedEl.removeAttribute("contenteditable");
        }

        selectedEl = t;
        selectedElRef.current = t;

        t.style.outline = "2px solid #00FF9C";
        t.setAttribute("contenteditable", "true");
        t.focus();

        const r = t.getBoundingClientRect();
        const ir = iframe.getBoundingClientRect();

        setCardPosition({
          x: ir.left + r.left + r.width / 2,
          y: ir.top + r.bottom + 8,
        });
      };

      const handleInput = () => {
        setHasChanges(true);
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && selectedEl) {
          selectedEl.style.outline = "";
          selectedEl.removeAttribute("contenteditable");
          selectedEl = null;
          setCardPosition(null);
        }
      };

      body.addEventListener("click", handleClick);
      body.addEventListener("input", handleInput);
      body.addEventListener("keydown", handleKeyDown);

      return () => {
        body.removeEventListener("click", handleClick);
        body.removeEventListener("input", handleInput);
        body.removeEventListener("keydown", handleKeyDown);
      };
    };

    iframe.onload = () => init();
    setTimeout(init, 30);
  }, [slide?.code]);

  /** ✅ AI Edit */
  const handleAiSectionChange = async (userPrompt: string) => {
    setLoading(true);

    const iframe = iframeRef.current;
    const selected = selectedElRef.current;
    if (!selected || !iframe) return;

    const old = selected.outerHTML;

    const prompt = `
Regenerate HTML based on user instruction. 
User: ${userPrompt}
HTML: ${old}
    `;

    try {
      const res = await GeminiAiModel.generateContent(prompt);
      const newHTML = (await res.response.text()).trim();

      const doc = iframe.contentDocument;
      const temp = doc?.createElement("div");
      if (!temp) return;

      temp.innerHTML = newHTML;
      const newNode = temp.firstElementChild;

      if (newNode && selected.parentNode) {
        selected.parentNode.replaceChild(newNode, selected);
        selectedElRef.current = newNode as HTMLElement;

        setHasChanges(true);
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div className="mb-5 w-full flex justify-center overflow-auto relative">
      <div className="relative w-full max-w-[800px]">
        <iframe
          ref={iframeRef}
          className="w-full h-[250px] sm:h-[500px] rounded-2xl border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {/* Save button - shows when there are unsaved changes */}
        {hasChanges && (
          <Button
            onClick={saveCurrentContent}
            size="sm"
            className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 z-10"
          >
            <Save size={16} className="mr-1" />
            Save Changes
          </Button>
        )}
      </div>

      {cardPosition && (
        <FloatingActionTool
          position={cardPosition}
          loading={loading}
          onClose={() => setCardPosition(null)}
          handleAiChange={handleAiSectionChange}
        />
      )}
    </div>
  );
};

export default SliderFrame;
