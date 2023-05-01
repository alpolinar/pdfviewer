import React, { useEffect, useRef, useState } from "react";

import { Box, Grid } from "@mui/material";
import { PDFDocumentProxy } from "pdfjs-dist";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";

export type PDFFile = string | File | null;

export type DocumentViewerProps = {
    src: string | File | null;
    variant?: "single" | "all";
    getTotalPages?: (p: number) => void;
    currentPage?: number;
    zoom?: number;
    width?: number | string;
    height?: number | string;
};

const options = {
    verbosity: 0,
};

export const DocumentViewer = ({
    src,
    variant = "all",
    getTotalPages,
    currentPage,
    zoom = 10,
    width = "100%",
    height = "100%",
}: DocumentViewerProps) => {
    const [totalPages, setTotalPages] = useState<number>(0);
    const scroll = useRef(null);

    const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
        setTotalPages(numPages);
    };

    useEffect(() => {
        if (getTotalPages) getTotalPages(totalPages);
    }, [totalPages, getTotalPages]);

    return (
        <Box ref={scroll} sx={{ width, height, overflow: "auto" }}>
            <Document file={src} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {variant === "all" && (
                    <Grid container gap={1}>
                        {Array.from(new Array(totalPages), (_, i) => (
                            <Grid item key={i}>
                                <Page
                                    pageNumber={i + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    scale={zoom}
                                    height={100}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {variant === "single" && (
                    <Page
                        pageNumber={currentPage}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={zoom}
                        height={100}
                    />
                )}
            </Document>
        </Box>
    );
};
