import { isArray } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editName, selectAnimals, selectStatus } from "./ListSlice";
import Alarm from "./components/Alarm";
import styles from "./List.module.css";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import ButtonContainer from "./components/ButtonContainer";

function Item({ IamgeName, image_link, number}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  function SubmitClick() {
    dispatch(editName({ newName: name, number }));
  }

  function nameChange(e) {
    setName(e.target.value);
  }
  function ShowToggle() {
    setShow(!show);
  }

  return (
    <div className={styles.animalItem}>
      <h1>{IamgeName}</h1>
      <img src={image_link} alt={IamgeName} height={200} />
      {!show ? (
        <ButtonContainer>
          <Button onClick={ShowToggle}>Edit</Button>
          <Link to={`/${number}`}>
            <Button>More</Button>
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <label> new name : </label>
          <input onChange={nameChange} className={styles.input} />
          <Button onClick={SubmitClick}>Sumbit</Button>
          <Button onClick={ShowToggle}>X</Button>
        </ButtonContainer>
      )}
    </div>
  );
}

function List() {
  const animals = useSelector(selectAnimals);
  const status = useSelector(selectStatus);

  if (status === "error") {
    return <Alarm>Please use VPN to connect to server</Alarm>;
  }
  if (status === "loading") {
    return <Alarm> loading... (use VPN) </Alarm>;
  }
  return (
    <>
      <div className={styles.title}> animals</div>
      <div className={styles.animalList}>
        {isArray(animals) &&
          animals.map(({ name, ...rest }, index) => (
            <Item key={name} IamgeName={name} {...rest} number={index}  />
          ))}
      </div>
    </>
  );
}

export default List;
