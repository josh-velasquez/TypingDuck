import { Box, Divider, Modal, TextField, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { DoneRounded } from "@mui/icons-material";

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
          maxWidth: "90vw",
          bgcolor: "var(--primary-surface)",
          border: "1px solid var(--neutral-700)",
          borderRadius: "var(--radius-lg)",
          pt: 3,
          px: 4,
          pb: 3,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginBottom: 2,
            color: "var(--neutral-100)",
            fontWeight: 500
          }}
        >
          {title}
        </Typography>
        <Divider sx={{ borderColor: "var(--neutral-700)" }} />
        <TextField
          sx={{
            marginTop: 3,
            height: 175,
            overflowY: "auto",
            textTransform: "lowercase",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--primary-elevated)",
              color: "var(--neutral-100)",
              "& fieldset": {
                borderColor: "var(--neutral-600)",
              },
              "&:hover fieldset": {
                borderColor: "var(--neutral-500)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--accent-primary)",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "var(--neutral-500)",
              opacity: 1,
            },
          }}
          size="medium"
          fullWidth
          variant="outlined"
          multiline
          value={inputText}
          placeholder="paste text here..."
          onChange={(event) => setInputText(event.target.value)}
        />
        <CustomButton
          buttonText="Done"
          onCustomButtonClick={handleCloseClick}
          icon={<DoneRounded />}
          sx={{
            backgroundColor: "transparent",
            color: "var(--neutral-500)",
            border: "1px solid var(--neutral-600)",
            fontSize: "0.8rem",
            padding: "8px 16px",
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "var(--primary-elevated)",
              borderColor: "var(--neutral-500)",
              color: "var(--neutral-300)",
            },
          }}
        />
      </Box>
    </Modal>
  );
};

export default InputModal;
