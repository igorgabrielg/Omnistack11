import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  const [casos, setCasos] = useState([]);

  const ongNome = localStorage.getItem("ongNome");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        setCasos(response.data);
      });
  }, [ongId]);

  async function handleApagarCaso(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setCasos(casos.filter(casos => casos.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongNome}</span>

        <Link to="/casos/novo" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1> Casos cadastrados</h1>

      <ul>
        {casos.map(casos => (
          <li key={casos.id}>
            <strong>CASO:</strong>
            <p>{casos.titulo}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{casos.descricao}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(casos.value)}
            </p>

            <button onClick={() => handleApagarCaso(casos.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
