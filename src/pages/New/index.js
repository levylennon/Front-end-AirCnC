import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import api from "../../services/api";
import "./style.css";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: {
        user_id,
      },
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={(event) => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">Empresa *</label>
      <input
        id="company"
        value={company}
        placeholder="Sua empresa"
        onChange={(event) => setCompany(event.target.value)}
      />
      <label htmlFor="techs">Tecnologias *</label>
      <input
        id="techs"
        value={techs}
        placeholder="Quais tecnologias usam?"
        onChange={(event) => setTechs(event.target.value)}
      />
      <label htmlFor="techs">
        Valor da diária * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        value={price}
        placeholder="Valor cobrado por dia"
        onChange={(event) => setPrice(event.target.value)}
      />
      <button className="btn" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
