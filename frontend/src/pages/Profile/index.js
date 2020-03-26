import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongNome = localStorage.getItem("ongNome");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(casos.filter(casos => casos.id !== id));
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
        <span>Bem vinda, {ongName}</span>

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
            <p>{casos.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{casos.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(casos.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeletarCaso(casos.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
