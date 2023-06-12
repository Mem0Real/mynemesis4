import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import deleteCategory from "./components/deleteCategory";

export default function AlertDialog({
  alertDialog,
  handleCloseAlert,
  deleteData,
  setDeleteData,
  mutate,
}) {
  let dd = { entry: null, id: null, name: null };
  if (deleteData.entry === "items") {
    dd.entry = deleteData.entry;
    dd.id = deleteData.itemId;
    dd.name = deleteData.itemName;
  } else if (deleteData.entry === "children") {
    dd.entry = deleteData.entry;
    dd.id = deleteData.childId;
    dd.name = deleteData.childName;
  } else if (deleteData.entry === "parents") {
    dd.entry = deleteData.entry;
    dd.id = deleteData.parentId;
    dd.name = deleteData.parentName;
  } else if (deleteData.entry === "categories") {
    dd.entry = deleteData.entry;
    dd.id = deleteData.categoryId;
    dd.name = deleteData.categoryName;
  }

  const handleDelete = async (deleteData) => {
    try {
      await deleteCategory(deleteData);
      setTimeout(() => mutate(), 2000);
      handleCloseAlert();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog
        open={alertDialog}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center bg-neutral-900 text-red-600"
        >
          {`Delete ${dd.name}?`}
        </DialogTitle>
        <DialogContent className="bg-neutral-900">
          <DialogContentText id="alert-dialog-description">
            <span className=" text-neutral-200">
              If you proceed, it will be removed from the database permanently!
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button
            onClick={() => handleDelete(deleteData)}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
