import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      try {
        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions
        );
        setExerciseDetail(exerciseDetailData);

        // Fetch YouTube videos with error handling and logging
        const query = encodeURIComponent(`${exerciseDetailData.name} exercise`);
        const youtubeUrl = `${youtubeSearchUrl}/search?query=${query}&type=v&sort=v`;
        const exerciseVideosData = await fetchData(youtubeUrl, youtubeOptions);
        console.log("YouTube API response:", exerciseVideosData);
        setExerciseVideos(exerciseVideosData.contents || []);

        // Fetch similar target muscle exercises
        let targetMuscleExercisesData = [];
        if (exerciseDetailData.target) {
          targetMuscleExercisesData = await fetchData(
            `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions
          );
          targetMuscleExercisesData = Array.isArray(targetMuscleExercisesData)
            ? targetMuscleExercisesData.filter(
                (ex) => ex.id !== exerciseDetailData.id
              )
            : [];
        }
        setTargetMuscleExercises(targetMuscleExercisesData);

        // Fetch similar equipment exercises
        let equipmentExercisesData = [];
        if (exerciseDetailData.equipment) {
          equipmentExercisesData = await fetchData(
            `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
            exerciseOptions
          );
          equipmentExercisesData = Array.isArray(equipmentExercisesData)
            ? equipmentExercisesData.filter(
                (ex) => ex.id !== exerciseDetailData.id
              )
            : [];
        }
        setEquipmentExercises(equipmentExercisesData);
      } catch (error) {
        setExerciseDetail({});
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
        setExerciseVideos([]);
        console.error("Error fetching similar exercises:", error);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail || !exerciseDetail.id) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
