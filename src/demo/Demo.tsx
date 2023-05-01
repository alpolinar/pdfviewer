import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { isEqual } from "lodash";
import { useState } from "react";
import { DocumentViewer, PDFFile } from "../components/DocumentViewer";

function Demo() {
    const [file, setFile] = useState<PDFFile>("../../public/sample.pdf");
    const [totalPages, setTotalPages] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const nextPage = () => {
        if (isEqual(currentPage, totalPages)) return;
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (isEqual(currentPage, 1)) return;
        setCurrentPage((prev) => prev - 1);
    };

    const zoomIn = () => setZoom((prev) => prev + 0.5);
    const zoomOut = () => setZoom((prev) => prev - 0.5);

    return (
        <Box>
            <Typography variant="body1">Total Pages: {totalPages}</Typography>
            <DocumentViewer
                variant="single" // change this to single to use nav button
                src={file}
                getTotalPages={setTotalPages}
                currentPage={currentPage}
                zoom={zoom}
                width="600px"
                height="600px"
            />
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button onClick={prevPage} color="primary" variant="contained">
                        Prev
                    </Button>
                </Grid>
                <Grid item>
                    <Grid container gap={1}>
                        <Grid item>
                            <IconButton onClick={zoomOut}>
                                <ZoomOut color="primary" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={zoomIn}>
                                <ZoomIn color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={nextPage} color="primary" variant="contained">
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Demo;
