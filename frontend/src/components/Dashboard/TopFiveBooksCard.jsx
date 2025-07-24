import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Rating,
  Typography,
  Divider,
} from "@mui/material";

const TopFiveBooks = ({ books }) => {
  return (
    <Box width={"100%"}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Top Five Books
          </Typography>
          <List>
            {books.slice(0, 5).map((book, index) => (
              <React.Fragment key={book.id}>
                <ListItem alignItems="flex-start">
                  <Box mx={2}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={book.image}
                        sx={{ width: 60, height: 80 }}
                      />
                    </ListItemAvatar>
                  </Box>
                  <ListItemText
                    primary={book.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          by {book.author}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mt={0.5}
                        >
                          <Rating
                            value={book.rating}
                            precision={0.1}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2">{book.rating}</Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box textAlign="right">
                      <Typography variant="body2">
                        {book.reviews} reviews
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated today
                      </Typography>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < 4 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopFiveBooks;
