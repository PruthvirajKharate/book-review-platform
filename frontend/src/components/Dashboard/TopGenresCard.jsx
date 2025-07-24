import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

const genres = ["Fiction", "Romance", "Self-Help", "Mystery", "Sci-Fi"];

const TopGenresCard = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Top Genres
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {genres.map((genre, index) => {
          const percentage = Math.max(20, 100 - index * 15);
          return (
            <Box key={genre}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2">{genre}</Typography>
                <Typography variant="body2">{percentage}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          );
        })}
      </Box>
    </CardContent>
  </Card>
);

export default TopGenresCard;
