import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import {
  Add as AddIcon,
  GetApp as ExportIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const QuickActionsCard = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" startIcon={<AddIcon />} fullWidth>
          Add New Book
        </Button>
        <Button variant="outlined" startIcon={<ExportIcon />} fullWidth>
          Export Reports
        </Button>
        <Button variant="outlined" startIcon={<SettingsIcon />} fullWidth>
          Manage Reviews
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default QuickActionsCard;
