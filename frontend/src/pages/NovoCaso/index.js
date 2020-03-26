import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NovoCaso() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNovoCaso(e) {
    e.preventDefault();

    const data = {
      titulo,
      descricao,
      value
    };

    try {
      await api.post("/casos", data, {
        headers: { Authorization: ongId }
      });

      history.push("/profile");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
    }
  }
  return (
    <div className="novo-caso-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNovoCaso}>
          <input
            placeholder="Título do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}