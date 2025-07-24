import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import { Favorite, Share, Comment } from "@mui/icons-material";

const BookCard = ({ book }) => (
  <Card
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box position="relative">
      <CardMedia
        component="img"
        height="240"
        image={book.image}
        alt={book.title}
      />
      <Chip
        label={book.trend}
        color={
          book.trend === "up"
            ? "success"
            : book.trend === "down"
            ? "error"
            : "default"
        }
        size="small"
        sx={{ position: "absolute", top: 8, right: 8 }}
      />
    </Box>

    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="h3" noWrap>
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        by {book.author}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {book.description}
      </Typography>

      <Chip
        label={book.genre}
        color="primary"
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Rating value={book.rating} precision={0.1} readOnly size="small" />
        <Typography variant="body2" fontWeight="bold">
          {book.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({book.reviews.toLocaleString()} reviews)
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={3}
        sx={{ color: "text.secondary" }}
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <Favorite fontSize="small" />
          <Typography variant="caption">{book.likes}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Comment fontSize="small" />
          <Typography variant="caption">{book.comments}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Share fontSize="small" />
          <Typography variant="caption">{book.shares}</Typography>
        </Box>
      </Box>
    </CardContent>

    <CardActions sx={{ px: 2, pb: 2 }}>
      <Button variant="contained" fullWidth size="small">
        View Details
      </Button>
    </CardActions>
  </Card>
);

export default BookCard;
