import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebaseDb, GeminiAiModel } from "../../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import SliderStyle from "../../../components/custom/SliderStyle";
import OutlineSection from "../../../components/custom/OutlineSection";

type Project = {
  userInputPrompt: string;
  projectId: string;
  createdAt: number;
  noOfSlider?: number;
};

const Outline = () => {
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);

  // Fetch project details
  const GetProjectDetails = async () => {
    if (!projectId) return;

    const docRef = doc(firebaseDb, "project", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProjectDetails(docSnap.data() as Project);
    }
  };

  //  Generate the outline AFTER details are fetched
  const GenerateSlidersOutline = async () => {
    setLoading(true);
    if (!projectDetails) return;

    const slideCount = projectDetails.noOfSlider || 6;
    const Outline_prompt = `
Generate a PowerPoint slide outline for the topic "${projectDetails.userInputPrompt}".
Create "${slideCount}" slides.
If the number of slides is not specified, create 6 slides by default.
Each slide should include a slide number, a title (slidePoint), and a 2-line descriptive outline
that clearly explains what the slide will cover.

Structure:
1. The first slide should be a Welcome screen.
2. The second slide should be an Agenda screen.
3. The final slide should be a Thank You screen.

Return ONLY the response in pure JSON format using this schema:
[
  {
    "slideNo": "",
    "slidePoint": "",
    "outline": ""
  }
]
`;

    console.log(" Prompt being sent:\n", Outline_prompt);

    const result = await GeminiAiModel.generateContent(Outline_prompt);
    const text = result.response.text();
    console.log(" AI response:", text);
    setLoading(false);
  };

  // Fetch once on mount
  useEffect(() => {
    GetProjectDetails();
  }, [projectId]);

  // Run generator when projectDetails changes
  useEffect(() => {
    if (projectDetails) GenerateSlidersOutline();
  }, [projectDetails]);

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col">
        <h2 className="font-bold text-2xl mb-6 text-white text-center">
          Settings and Slider Outline
        </h2>
        <SliderStyle />
        <OutlineSection loading={loading} />
      </div>
    </div>
  );
};

export default Outline;
