import { useContext, createContext } from "react";

const EditContext = createContext();

function EditWrapper({ children, edit }) {
  return (
    <EditContext.Provider value={ edit }>{children}</EditContext.Provider>
  );
}
function Edit({ children, notEditing }) {
  const edit  = useContext(EditContext);
  if (edit) {
    return children;
  } else {
    return notEditing;
  }
}

export { Edit };
export default EditWrapper;
