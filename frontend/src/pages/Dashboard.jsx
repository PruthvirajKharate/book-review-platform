import React, { useState, useEffect } from "react";
import StatCard from "../components/Dashboard/StatCard";
// New reusable cards
import TopGenresCard from "../components/Dashboard/TopGenresCard";
import QuickActionsCard from "../components/Dashboard/QuickActionsCard";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Paper,
  Avatar,
  Chip,
  Rating,
  IconButton,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Menu,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  MenuBook as BookIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as AwardIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  BarChart as BarChartIcon,
  Add as AddIcon,
  GetApp as ExportIcon,
  Settings as SettingsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopFiveBooks from "../components/Dashboard/TopFiveBooksCard";
import BookCard from "../components/Dashboard/BookCard";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#7c3aed",
      light: "#a855f7",
      dark: "#5b21b6",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#be185d",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

const BookReviewDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalReviews: 0,
    avgRating: 0,
    totalUsers: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  // Sample data
  useEffect(() => {
    const sampleBooks = [
      {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        rating: 4.8,
        reviews: 2847,
        genre: "Fiction",
        publishDate: "2020-08-13",
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        trend: "up",
        likes: 1423,
        comments: 892,
        shares: 234,
        description:
          "A novel about all the choices that go into a life well lived.",
      },
      {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        rating: 4.9,
        reviews: 5692,
        genre: "Self-Help",
        publishDate: "2018-10-16",
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        trend: "up",
        likes: 2847,
        comments: 1203,
        shares: 567,
        description: "Tiny changes, remarkable results.",
      },
      {
        id: 3,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        rating: 4.7,
        reviews: 8432,
        genre: "Romance",
        publishDate: "2017-06-13",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
        trend: "stable",
        likes: 4521,
        comments: 2134,
        shares: 892,
        description: "A reclusive Hollywood icon finally tells her story.",
      },
      {
        id: 4,
        title: "Educated",
        author: "Tara Westover",
        rating: 4.6,
        reviews: 3456,
        genre: "Memoir",
        publishDate: "2018-02-20",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        trend: "down",
        likes: 1876,
        comments: 934,
        shares: 345,
        description: "A memoir about education and transformation.",
      },
      {
        id: 5,
        title: "Project Hail Mary",
        author: "Andy Weir",
        rating: 4.9,
        reviews: 4321,
        genre: "Sci-Fi",
        publishDate: "2021-05-04",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
        trend: "up",
        likes: 2654,
        comments: 1543,
        shares: 432,
        description: "A lone astronaut must save the human race.",
      },
    ];

    setBooks(sampleBooks);
    setStats({
      totalBooks: sampleBooks.length,
      totalReviews: sampleBooks.reduce((sum, book) => sum + book.reviews, 0),
      avgRating: (
        sampleBooks.reduce((sum, book) => sum + book.rating, 0) /
        sampleBooks.length
      ).toFixed(1),
      totalUsers: 12847,
    });
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      book.genre.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(b.publishDate) - new Date(a.publishDate);
      default:
        return 0;
    }
  });

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <AppBar position="static" color="error" elevation={0}>
          <Toolbar
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: { xs: 1, sm: 0 },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <BookIcon sx={{ mr: 2 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 700 }}
              >
                BookReview Dashboard
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 1, sm: 0 },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                size="small"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: 300 },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                    "& input": { color: "white" },
                    "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
                  },
                }}
              />
              <FormControl sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                >
                  <MenuItem value="all">All Genres</MenuItem>
                  <MenuItem value="fiction">Fiction</MenuItem>
                  <MenuItem value="self-help">Self-Help</MenuItem>
                  <MenuItem value="romance">Romance</MenuItem>
                  <MenuItem value="memoir">Memoir</MenuItem>
                  <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                  <MenuItem value="mystery">Mystery</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container
          maxWidth={false}
          sx={{
            py: { xs: 2, sm: 4 },
            px: { xs: 1, sm: 3, md: 6 },
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {/* Navigation Tabs */}
          <Paper sx={{ mb: { xs: 2, sm: 3 } }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
              >
                <Tab icon={<BarChartIcon />} label="Overview" />
                <Tab icon={<BookIcon />} label="Books" />
                <Tab icon={<TrendingUpIcon />} label="Trending" />
                <Tab icon={<AwardIcon />} label="Analytics" />
              </Tabs>
            </Box>
          </Paper>

          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, sm: 3 },
                justifyContent: { xs: "center", sm: "space-between" },
              }}
            >
              <Box
                sx={{
                  flex: "1 1 220px",
                  minWidth: { xs: "100%", sm: "220px" },
                  maxWidth: { xs: "100%", sm: "250px", md: "300px" },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <StatCard
                  icon={BookIcon}
                  title="Total Books"
                  value={stats.totalBooks.toLocaleString()}
                  color="gray"
                />
              </Box>
              <Box
                sx={{
                  flex: "1 1 220px",
                  minWidth: { xs: "100%", sm: "220px" },
                  maxWidth: { xs: "100%", sm: "250px", md: "300px" },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <StatCard
                  icon={CommentIcon}
                  title="Total Reviews"
                  value={stats.totalReviews.toLocaleString()}
                  color="gray"
                />
              </Box>
              <Box
                sx={{
                  flex: "1 1 220px",
                  minWidth: { xs: "100%", sm: "220px" },
                  maxWidth: { xs: "100%", sm: "250px", md: "300px" },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <StatCard
                  icon={StarIcon}
                  title="Avg Rating"
                  value={stats.avgRating}
                  color="gray"
                />
              </Box>
              <Box
                sx={{
                  flex: "1 1 220px",
                  minWidth: { xs: "100%", sm: "220px" },
                  maxWidth: { xs: "100%", sm: "250px", md: "300px" },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <StatCard
                  icon={PeopleIcon}
                  title="Active Users"
                  value={stats.totalUsers.toLocaleString()}
                  color="gray"
                />
              </Box>
            </Box>
            <Box width={"100%"} sx={{ mt: { xs: 1, sm: 2 } }}>
              <TopFiveBooks books={books} />
            </Box>

            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
              width="100%"
              mt={2}
            >
              <Box width={{ xs: "100%", md: "50%" }}>
                <TopGenresCard />
              </Box>
              <Box width={{ xs: "100%", md: "50%" }} mt={{ xs: 2, md: 0 }}>
                <QuickActionsCard />
              </Box>
            </Box>
          </TabPanel>

          {/* Books Tab */}
          <TabPanel value={activeTab} index={1}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FilterIcon color="action" />
                    <FormControl size="small">
                      <InputLabel>Sort by</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort by"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <MenuItem value="rating">Rating</MenuItem>
                        <MenuItem value="reviews">Reviews</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Showing {sortedBooks.length} of {books.length} books
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={3}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {sortedBooks.map((book) => (
                <Box
                  key={book.id}
                  sx={{
                    flex: "1 1 260px",
                    minWidth: { xs: "100%", sm: "260px" },
                    maxWidth: { xs: "100%", sm: "320px", md: "360px" },
                  }}
                >
                  <BookCard book={book} />
                </Box>
              ))}
            </Box>
          </TabPanel>

          {/* Trending Tab */}
          <TabPanel value={activeTab} index={2}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trending Books
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Books with increasing popularity and engagement
                </Typography>
              </CardContent>
            </Card>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={3}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {books
                .filter((book) => book.trend === "up")
                .map((book) => (
                  <Box
                    key={book.id}
                    sx={{
                      flex: "1 1 260px",
                      minWidth: { xs: "100%", sm: "260px" },
                      maxWidth: { xs: "100%", sm: "320px", md: "360px" },
                    }}
                  >
                    <BookCard book={book} />
                  </Box>
                ))}
            </Box>
          </TabPanel>

          {/* Analytics Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Rating Distribution
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage =
                          rating === 5
                            ? 65
                            : rating === 4
                            ? 25
                            : rating === 3
                            ? 8
                            : rating === 2
                            ? 2
                            : 0;
                        return (
                          <Box key={rating}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={0.5}
                            >
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2">
                                  {rating}
                                </Typography>
                                <StarIcon
                                  sx={{ fontSize: 16, color: "warning.main" }}
                                />
                              </Box>
                              <Typography variant="body2">
                                {percentage}%
                              </Typography>
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
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Monthly Growth
                    </Typography>
                    <Typography
                      variant="h3"
                      color="success.main"
                      fontWeight="bold"
                      gutterBottom
                    >
                      +23.4%
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Reviews increased compared to last month
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography variant="body2">
                        • New reviews: +1,234
                      </Typography>
                      <Typography variant="body2">• New users: +567</Typography>
                      <Typography variant="body2">
                        • Books added: +89
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default BookReviewDashboard;
