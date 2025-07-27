import React, { useEffect, useState } from "react";
import { Typography, Stack, Button, Box } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { fetchExerciseImage } from "../utils/fetchData";

const Detail = ({ exerciseDetail }) => {
  const {
    bodyPart,
    gifUrl,
    name,
    target,
    equipment,
    secondaryMuscles,
    instructions,
    description,
    difficulty,
    category,
    id,
  } = exerciseDetail;

  const [exerciseImg, setExerciseImg] = useState(gifUrl);

  useEffect(() => {
    if (id) {
      fetchExerciseImage(id)
        .then(setExerciseImg)
        .catch(() => setExerciseImg(gifUrl));
    }
  }, [id, gifUrl]);

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={exerciseImg} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography
          sx={{ fontSize: { lg: "64px", xs: "30px" } }}
          fontWeight={700}
          textTransform="capitalize"
        >
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: { lg: "20px", xs: "16px" } }}
          color="#4F4C4C"
          mb={2}
        >
          <strong>Description:</strong> {description}
        </Typography>
        <Stack direction="row" gap={2} mb={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2196f3",
              color: "#fff",
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          >
            Difficulty: {difficulty}
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#9c27b0",
              color: "#fff",
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
          >
            Category: {category}
          </Button>
        </Stack>
        {extraDetail?.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#FFF2DB",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Typography
              textTransform="capitalize"
              sx={{ fontSize: { lg: "30px", xs: "20px" } }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
        <Typography sx={{ fontSize: { lg: "20px", xs: "16px" }, mt: 2 }}>
          <strong>Secondary Muscles:</strong>{" "}
          {secondaryMuscles && secondaryMuscles.length > 0
            ? secondaryMuscles.join(", ")
            : "None"}
        </Typography>
        <Box mt={2}>
          <Typography
            sx={{ fontSize: { lg: "22px", xs: "18px" }, mb: 1 }}
            fontWeight={600}
          >
            Instructions:
          </Typography>
            {instructions &&
              instructions.map((step, idx) => (
                <li key={idx} style={{ fontSize: { lg: "20px", xs: "16px" }, marginBottom: "8px" }}>
                  {step}
                </li>
              ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Detail;
