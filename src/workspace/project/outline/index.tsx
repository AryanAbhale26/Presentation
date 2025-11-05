import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseDb, GeminiAiModel } from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SliderStyle, {
  type DesignStyleType,
} from "../../../components/custom/SliderStyle";
import OutlineSection from "../../../components/custom/OutlineSection";
import { Button } from "../../../components/ui/button";
import { Sparkle } from "lucide-react";
import { UserDetailContext } from "@/config/context/UserDetailContex";

export type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: number;
  noOfSlider?: number;
  outline?: outLine[];
  slides: any[];
  designStyle: DesignStyle;
  id?: string;
};

export type outLine = {
  slideNo: string;
  slidePoint: string;
  outline: string;
};

export type DesignStyle = {
  colors: any;
  designGuide: string;
  styleName: string;
};

const Outline = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateDbLoading, setUpdateDbLoading] = useState(false);
  const { projectId } = useParams();
  const [outline, setOutline] = useState<outLine[] | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyleType>();

  const GetProjectDetails = async () => {
    if (!projectId) return;

    const docRef = doc(firebaseDb, "project", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Project;
      setProjectDetails(data);

      // ✅ Load saved outline if exists
      if (
        data.outline &&
        Array.isArray(data.outline) &&
        data.outline.length > 0
      ) {
        setOutline(data.outline);
      }
    }
  };

  const GenerateSlidersOutline = async () => {
    if (!projectDetails) return;
    setLoading(true);

    const slideCount = projectDetails.noOfSlider || 6;

    const Outline_prompt = `
Generate a PowerPoint slide outline for the topic "${projectDetails.userInputPrompt}".
Create "${slideCount}" slides. 
If not specified, default 6 slides.
Slide rules:
1) First slide: Welcome
2) Second slide: Agenda
3) Last slide: Thank You

Return ONLY JSON:
[
  { "slideNo": "", "slidePoint": "", "outline": "" }
]
`;

    try {
      const result = await GeminiAiModel.generateContent(Outline_prompt);
      const text = result.response.text();
      const rawJson = text.replace("```json", "").replace("```", "").trim();
      const JSONData = JSON.parse(rawJson);

      setOutline(JSONData);
    } catch (error) {
      console.error("Error generating outline:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save inline edited outline locally
  const handleOutlineUpdate = (index: number, updatedOutline: outLine) => {
    if (!outline) return;
    const newOutline = [...outline];
    newOutline[index] = updatedOutline;
    setOutline(newOutline);
  };

  useEffect(() => {
    GetProjectDetails();
  }, [projectId]);

  // ✅ Auto-generate outline if not exists
  useEffect(() => {
    if (!projectDetails) return;

    if (!projectDetails.outline || projectDetails.outline.length === 0) {
      GenerateSlidersOutline();
    }
  }, [projectDetails]);

  const generateSlides = async () => {
    if (!projectId) return;

    if (!selectedStyle) {
      alert("Please select a style before generating slides!");
      return;
    }

    const currentCredits = userDetails?.credits ?? 0;

    if (currentCredits <= 0) {
      const confirmUpgrade = window.confirm(
        " You have 0 credits.\nWould you like to upgrade to Premium?"
      );

      if (confirmUpgrade) {
        navigate("/workspace/pricing");
      }
      return;
    }

    const newCredits = currentCredits - 1;

    await setDoc(
      doc(firebaseDb, "users", userDetails.email),
      { credits: newCredits },
      { merge: true }
    );

    setUserDetails((prev: any) => ({
      ...prev,
      credits: newCredits,
    }));

    setUpdateDbLoading(true);
    try {
      await setDoc(
        doc(firebaseDb, "project", projectId),
        {
          designStyle: selectedStyle,
          outline: outline ?? [],
          slides: [],
        },
        { merge: true }
      );

      navigate(`/workspace/project/${projectId}/editor`);
    } finally {
      setUpdateDbLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        <h2 className="font-bold text-2xl mb-6 text-white text-center">
          Settings and Slider Outline
        </h2>

        <SliderStyle selectStyle={(value) => setSelectedStyle(value)} />

        <OutlineSection
          loading={loading}
          outline={outline}
          onUpdate={handleOutlineUpdate}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={generateSlides}
          className="px-3 py-3 bg-green-500 hover:bg-green-700"
          size="lg"
        >
          Generate Slides <Sparkle />
        </Button>
      </div>
    </div>
  );
};

export default Outline;
