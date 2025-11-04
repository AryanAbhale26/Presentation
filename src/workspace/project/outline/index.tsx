import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebaseDb, GeminiAiModel } from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import SliderStyle, {
  type DesignStyleType,
} from "../../../components/custom/SliderStyle";
import OutlineSection from "../../../components/custom/OutlineSection";
import { Button } from "../../../components/ui/button";
import { Sparkle } from "lucide-react";

type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: number;
  noOfSlider?: number;
  outline?: outLine[];
};

export type outLine = {
  slideNo: string;
  slidePoint: string;
  outline: string;
};

const Outline = () => {
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
    }
  };

  const GenerateSlidersOutline = async () => {
    if (!projectDetails) return;
    setLoading(true);

    const slideCount = projectDetails.noOfSlider || 6;

    const Outline_prompt = `
Generate a PowerPoint slide outline for the topic "${projectDetails.userInputPrompt}".
Create "${slideCount}" slides.
If the number of slides is not specified, create 6 slides by default.
Each slide should include a slide number, a title (slidePoint), and a 2-line descriptive outline
that clearly explains what the slide will cover.

Structure:
1 The first slide should be a Welcome screen.
2 The second slide should be an Agenda screen.
3 The final slide should be a Thank You screen.

Return ONLY the response in pure JSON format using this schema:
[
  {
    "slideNo": "",
    "slidePoint": "",
    "outline": ""
  }
]
`;

    console.log("Prompt being sent:\n", Outline_prompt);

    try {
      const result = await GeminiAiModel.generateContent(Outline_prompt);
      const text = result.response.text();
      const rawJson = text.replace("```json", "").replace("```", "");
      const JSONData = JSON.parse(rawJson);
      setOutline(JSONData);
      console.log("AI response:", JSONData);
    } catch (error) {
      console.error("Error generating outline:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle outline update - just update local JSON state
  const handleOutlineUpdate = (index: number, updatedOutline: outLine) => {
    if (!outline) return;

    const newOutline = [...outline];
    newOutline[index] = updatedOutline;
    setOutline(newOutline);
  };

  useEffect(() => {
    GetProjectDetails();
  }, [projectId]);

  const generateSlides = async () => {
    if (!projectId) return;
    if (!selectedStyle) {
      alert("Please select a style before generating slides!");
      return;
    }

    setUpdateDbLoading(true);
    try {
      await setDoc(
        doc(firebaseDb, "project", projectId),
        {
          designStyle: selectedStyle ?? null, // ensure not undefined
          outline: outline ?? null, // ensure not undefined
        },
        { merge: true }
      );
      console.log("Slides generated and saved successfully!");
    } catch (err) {
      console.error("Error saving slides:", err);
    } finally {
      setUpdateDbLoading(false);
    }
  };

  useEffect(() => {
    if (projectDetails && !projectDetails.outline) {
      GenerateSlidersOutline();
    }
  }, [projectDetails]);

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        <h2 className="font-bold text-2xl mb-6 text-white text-center">
          Settings and Slider Outline
        </h2>
        <SliderStyle
          selectStyle={(value: DesignStyleType) => setSelectedStyle(value)}
        />
        <OutlineSection
          loading={loading}
          outline={outline}
          onUpdate={handleOutlineUpdate}
        />
      </div>
      <div className="flex  justify-center flex-row mt-4">
        <Button
          onClick={() => generateSlides()}
          className="px-3 py-3 bg-green-500 hover:bg-green-800  "
          size={"lg"}
        >
          {" "}
          Generate Slides <Sparkle />
        </Button>
      </div>
    </div>
  );
};

export default Outline;
