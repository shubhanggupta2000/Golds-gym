import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { fetchExerciseImage } from "../utils/fetchData";

const ExerciseCard = ({ exercise }) => {
  const [exerciseImg, setExerciseImg] = useState(exercise.gifUrl);

  useEffect(() => {
    if (exercise.id) {
      fetchExerciseImage(exercise.id)
        .then(setExerciseImg)
        .catch(() => setExerciseImg(exercise.gifUrl));
    }
  }, [exercise.id, exercise.gifUrl]);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exerciseImg} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FFA9A9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FCC757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: "24px", xs: "20px" } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
