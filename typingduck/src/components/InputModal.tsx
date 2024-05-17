import { Box, Divider, Modal, TextField, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { useState } from "react";

interface InputModalInterface {
  open: boolean;
  title: string;
  onInputChange: (input: string) => void;
  onClose: () => void;
}

const InputModal: React.FC<InputModalInterface> = ({
  open,
  title,
  onInputChange,
  onClose,
}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleCloseClick = () => {
    onInputChange(inputText);
    setInputText("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#2f243a",
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="whitesmoke"
          sx={{ marginBottom: 2 }}
        >
          {title}
        </Typography>
        <Divider />
        <TextField
          sx={{
            marginTop: 3,
            height: 175,
            overflowY: "auto",
          }}
          size="medium"
          fullWidth
          label="Custom Text"
          variant="outlined"
          color="primary"
          multiline
          value={inputText}
          placeholder="Paste text here..."
          onChange={(event) => setInputText(event.target.value)}
          InputProps={{ style: { color: "whitesmoke" } }}
          InputLabelProps={{ sx: { color: "white" } }}
        />
        <CustomButton
          buttonText="Done"
          onCustomButtonClick={handleCloseClick}
        />
      </Box>
    </Modal>
  );
};

export default InputModal;
