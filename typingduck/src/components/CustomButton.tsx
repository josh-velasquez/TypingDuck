import { Button } from "@mui/material";

interface CustomButtonInterface {
  buttonText: string;
  onCustomButtonClick: () => void;
  disableKeyInvoke?: boolean;
}

const CustomButton: React.FC<CustomButtonInterface> = ({
  buttonText,
  onCustomButtonClick,
  disableKeyInvoke,
}) => {
  const handleOnButtonClick = () => {
    onCustomButtonClick();
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 3,
        width: "20%",
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
      {buttonText}
    </Button>
  );
};

export default CustomButton;
