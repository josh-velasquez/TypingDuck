import { Button } from "@mui/material";
import { ReactNode } from "react";

interface CustomButtonInterface {
  buttonText: string;
  onCustomButtonClick: () => void;
  disableKeyInvoke?: boolean;
  icon?: ReactNode;
}

const CustomButton: React.FC<CustomButtonInterface> = ({
  buttonText,
  onCustomButtonClick,
  disableKeyInvoke,
  icon,
}) => {
  const handleOnButtonClick = () => {
    onCustomButtonClick();
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 5,
        backgroundColor: "#4A4E69",
        alignSelf: "center",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        "&:hover": {
          backgroundColor: "#C9ADA7",
        },
      }}
      onClick={handleOnButtonClick}
      onKeyDown={(e) => {
        if (disableKeyInvoke && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
        }
      }}
    >
      {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}
      {buttonText}
    </Button>
  );
};

export default CustomButton;
