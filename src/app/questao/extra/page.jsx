"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function QuestaoExtra() {
  const [toDo, setToDo] = useState([]);
  const [item, setItem] = useState({
    item: "",
  });

  useEffect(() => {
    const storedToDo = JSON.parse(localStorage.getItem("toDo"));
    if (storedToDo) {
      setToDo(storedToDo);
    }
  }, []);

  function updateLocalStorage(toDos) {
    localStorage.setItem("toDo", JSON.stringify(toDos));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDo([...toDo, item]);
    updateLocalStorage([...toDo, item]);
    setItem({ item: "" });
  };

  const handleRemoveItem = (index) => {
    const updateToDo = [...toDo];
    updateToDo.splice(index, 1);
    setToDo(updateToDo);
    updateLocalStorage(updateToDo);
  };

  const handleClearItems = () => {
    setToDo([]);
    updateLocalStorage([]);
  };

  return (
    <>
      <h1>Questão Extra</h1>
      <p>
        Crie um to-do app que adiciona e remove itens de uma lista. O app deve
        ter um pequeno formulário e um botão azul para adicionar itens. Cada
        item deve ter um botão para removê-lo. Deve existir também um botão
        verde para zerar a lista. Todos os botões precisam ser redondos e
        ficarem quadrados quando o mouse estiver sobre eles. A lista deve ser
        salva no localStorage.
      </p>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <form onSubmit={handleSubmit} className={styles.formBox}>
            <label>Crie uma tarefa</label>
            <input
              type="text"
              name="item"
              placeholder="Digite o nome da tarefa"
              value={item.item}
              onChange={(e) =>
                setItem((prev) => ({ ...prev, item: e.target.value }))
              }
            />
            <button type="submit">Criar</button>
          </form>
          <button onClick={handleClearItems} className={styles.resetButton}>
            Limpar
          </button>
        </div>

        <div className={styles.toDosContainer}>
          <ul>
            {toDo.map((item, index) => (
              <li key={index}>
                <h3>{toDo[index].item}</h3>
                <button onClick={() => handleRemoveItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
