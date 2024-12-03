import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import CategoryFilter from "./CategoryFilter";
import { categories, sources } from "../utils/constants";
import CustomAccordion from "./Accordion";
import useNewsFeed from "../hooks/useNewsFeed";
import { ArticleSource } from "../types/Article";

interface SettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

const SettingsModal = ({ open, handleClose }: SettingsModalProps) => {
  const { updateSettings } = useNewsFeed();
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [sourceFilters, setSourceFilters] = useState<string[]>([]);

  // Utility function to handle changes
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedFilters: string[],
    setFilters: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const isSelected = event.target.checked;
    const value = event.target.value;

    if (isSelected) {
      setFilters([...selectedFilters, value]);
    } else {
      const updatedFilters = selectedFilters.filter((item) => item !== value);
      setFilters(updatedFilters);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(event, categoryFilters, setCategoryFilters);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(event, sourceFilters, setSourceFilters);
  };

  // Update the personalized feed with saved settings
  useEffect(() => {
    const defaultSettings = localStorage.getItem("settings");
    if (defaultSettings) {
      const settings = JSON.parse(defaultSettings);
      if (settings.sources && settings.sources.length > 0) {
        const { sources: savedSources } = settings;

        setSourceFilters(savedSources as string[]);
      }
      if (settings.categories && settings.categories.length > 0) {
        const { categories: savedCategories } = settings;

        setCategoryFilters(savedCategories as string[]);
      }
    }
  }, []);

  const saveSettings = () => {
    handleClose();
    const settings = {
      sources: sourceFilters as ArticleSource[],
      categories: categoryFilters,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
    updateSettings(settings);
    
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex items-center justify-center min-h-screen">
          <div className="modal-box">
            <div className="flex justify-between items-center gap-3">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Personalize News Feed
              </Typography>
              <IconButton onClick={handleClose}>
                <IoMdClose />
              </IconButton>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <CustomAccordion label="Personalize Category">
                <CategoryFilter
                  items={categories}
                  selectedItems={categoryFilters}
                  handleChange={handleCategoryChange}
                />
              </CustomAccordion>
              <CustomAccordion label="Personalize Sources">
                <CategoryFilter
                  items={sources}
                  selectedItems={sourceFilters}
                  handleChange={handleSourceChange}
                />
              </CustomAccordion>
            </div>
            <div className="flex justify-end mt-5 p-2">
              <Button className="btn btn-neutral btn-sm" onClick={saveSettings}>
                Save Settings
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsModal;
