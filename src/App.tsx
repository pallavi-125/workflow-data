import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from './db';
import DataTable from "./components/DataTable";

// Component to display Chip with Title and Name
function ChipTypography({ title, name }: { title: string, name: string }) {
  return (
    <>
      <Chip label={title} />
      <Typography variant="subtitle2" fontWeight={700}>{name}</Typography>
    </>
  );
}

// Workflow Step component with toggle functionality
const WorkflowStep = ({ name_title, params_extra }: { name_title: string, params_extra: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <Box display="flex" gap={1}>
      <button style={{ display: 'inline-block' }} onClick={handleToggle}>
        {isOpen ? "➖" : "➕"}
      </button>
      <Accordion expanded={isOpen} sx={{ width: '100%', '::before': { margin: 0 } }}>
        <AccordionSummary>{name_title}</AccordionSummary>
        <AccordionDetails>
          {Object.keys(params_extra).filter(key => params_extra[key]).map(key => (
            <div key={key}>
              {key}: {typeof params_extra[key] === 'object' ? JSON.stringify(params_extra[key]) : params_extra[key]}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

// Main App Component
export default function App(): React.ReactElement {
  const [data, setData] = useState<any>({});
  const { table_headers = [], table_data = [], workflow_steps = [], row_count = 0 }: any = data;

  // Fetch data on component mount
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setData(result);
    })();
  }, []);

  return (
    <Box marginTop={10}>
      <Container maxWidth="xl">
        <Grid container gap={1}>
          <Grid item lg={8} xl={8} md={8}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display="flex" gap={1} alignItems="center">
                  <ChipTypography title="Project Name" name="ETL New Demo 2" />
                  <ChipTypography title="Output Database Name" name="ETL N_02" />
                  <ChipTypography title="Last Run" name="Not Available" />
                </Box>
                <Typography fontWeight={700}>Rows: {row_count}</Typography>
              </CardContent>
              <CardContent>
                <DataTable column={table_headers} row={table_data} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} xl={3} md={3}>
            <Card>
              <CardContent>
                <Typography fontWeight={700}>Workflow</Typography>
              </CardContent>
              <CardContent>
                {workflow_steps.map(({ name_title, params_extra }: any) => (
                  <WorkflowStep key={name_title} name_title={name_title} params_extra={params_extra} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
