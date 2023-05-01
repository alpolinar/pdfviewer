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
        <>
            <Typography variant="body1">Total Pages: {totalPages}</Typography>
            <Box sx={{ maxWidth: "600px", height: "600px" }}>
                <DocumentViewer
                    variant="single"
                    src={file}
                    getTotalPages={setTotalPages}
                    currentPage={currentPage}
                    zoom={zoom}
                />
            </Box>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button onClick={prevPage}>Prev</Button>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <IconButton onClick={zoomOut}>
                                <ZoomOut />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={zoomIn}>
                                <ZoomIn />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={nextPage}>Next</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Demo;
