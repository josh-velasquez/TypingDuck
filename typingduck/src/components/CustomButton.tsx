import { Button } from "@mui/material";
import { ReactNode } from "react";

interface CustomButtonInterface {
  buttonText: string;
  onCustomButtonClick: () => void;
  disableKeyInvoke?: boolean;
  icon?: ReactNode;
  sx?: any;
  selected?: boolean;
}

const CustomButton: React.FC<CustomButtonInterface> = ({
  buttonText,
  onCustomButtonClick,
  disableKeyInvoke,
  icon,
  sx,
  selected,
}) => {
  const handleOnButtonClick = () => {
    onCustomButtonClick();
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        background: selected ? "var(--accent-primary)" : "var(--primary-surface)",
        color: selected ? "var(--primary-elevated)" : "var(--neutral-100)",
        border: "1px solid var(--neutral-600)",
        alignSelf: "center",
        borderRadius: "var(--radius-lg)",
        textTransform: "lowercase",
        fontWeight: 500,
        fontSize: "1rem",
        padding: "12px 24px",
        transition: "var(--transition-normal)",
        "&:hover": {
          background: "var(--accent-primary)",
          borderColor: "var(--accent-primary)",
        },
        ...sx,
      }}
      onClick={handleOnButtonClick}
      onKeyDown={(e) => {
        if (disableKeyInvoke && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
        }
      }}
    >
      {icon && (
        <span style={{ display: "flex", marginRight: "5px" }}>{icon}</span>
      )}
      {buttonText}
    </Button>
  );
};

export default CustomButton;
