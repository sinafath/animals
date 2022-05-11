import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import EditWrapper, { Edit } from "../Context/Edit";
import { saveItem, selectAnimal } from "../ListSlice";
import styles from "./Index.module.css";

function Table({ id }) {
  const animal = useSelector(selectAnimal(id));
  const removedPrperties = ["image_link", "id", "name", "imageObject"];

  return (
    <table className={styles.table} cellSpacing="0">
      <tbody>
        <tr className={styles.titleRule}>
          <td colSpan="2" className={styles.titleTableData}>
            <Edit notEditing={animal.name}>
              <Input
                title={"name"}
                classNames={styles.Input}
                defaultValue={animal.name}
              />
            </Edit>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <img alt={animal.name} src={animal.image_link} width={500} />
          </td>
        </tr>
        {Object.entries(animal)
          .filter(([value]) => !removedPrperties.includes(value))
          .map(([title, data], index) => (
            <tr className={styles.tableRule} key={index}>
              <td className={styles.tableData}>{title.replace("_", " ")}:</td>
              <td className={styles.tableData}>
                <Edit notEditing={data}>
                  <Input
                    defaultValue={data}
                    title={title}
                    classNames={styles.Input}
                  />
                </Edit>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function Item() {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  function editToggle(e) {
    e.preventDefault();
    setEdit((edit) => !edit);
  }

  function handleSubmit(data) {
    dispatch(
      saveItem({
        item: data,
        id,
      })
    );
    setEdit(false);
  }

  return (
    <EditWrapper edit={edit}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Table id={id} />
        <Edit notEditing={<Button onClick={editToggle}>edit</Button>}>
          <Button type="submit">save</Button>
          <Button onClick={editToggle}>X</Button>
        </Edit>
      </Form>
    </EditWrapper>
  );
}

export default Item;
