/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { MenuItem, Select } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";


function FormEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  /**
   * productname,
            price,
            description,
            technicalinformation,
            quantity,
            sectionid
   */
  const initProduct = {
    id: 0,
    productname: "",
    price: "",
    description: "",
    technicalinformation: "",
    quantity: 0,
    sectionid: 0,
    active: true,

  };

  const [product, setProduct] = useState(initProduct);
  const [sections, setSections] = useState([]);
  const [sentinela, setSentinela] = useState(false);

  useEffect(() => {
    api.get("section").then((response) => {
      setSections(response.data.sections);
    });
    if (id !== null || id !== "") {
      if (!sentinela) {
        api.get(`/product/${id}`).then((response) => {
          const productAux = {
            id: response.data.product.id,
            productname: response.data.product.product_name,
            price: response.data.product.price,
            description: response.data.product.description,
            technicalinformation: response.data.product.technical_information,
            quantity: response.data.product.quantity,
            sectionid: response.data.product.SectionId,
            active: response.data.product.active,
          }
          setProduct({ ...productAux });

        });
        setSentinela(true);
      }
    }
  }, [id, sentinela]);

  async function saveSection(value) {
    try {
      await api.post('/section', { sectionname: value }).then((response) => {
        alert("Nova se????o cadastrado.")
      });
      setSentinela(false);
    } catch (err) {
      alert("Erro ao cadastrar se????o.");
    }
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(product)
    api.patch("/product", product).then((response) => {
      alert("Produto atualizado com sucesso!");
      navigate("/products");
    });
  }

  function newSection() {
    const sectionname = prompt("Insira o nome da se????o", "");
    console.log("item = ", sectionname);
    if (sectionname == null || sectionname === "") {
      alert("Nenhum valor inserido!");
    } else {
      saveSection(sectionname.toUpperCase());
    }
  }

  //pode-se adicionar um verificador para confirmar sa??da.
  function onCancel(ev) {
    navigate("/products");
  }

  function onChange(ev) {
    const { name, value } = ev.target;
    setProduct({ ...product, [name]: value, });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Atualizar produto
                </MDTypography>
              </MDBox>

              <MDBox m={4}>
                <MDBox ml={2} lineHeight={1}>
                  <MDButton color="info" onClick={() => newSection()}>
                    Nova se????o
                  </MDButton>
                </MDBox>
                <form onSubmit={onSubmit}>
                  <MDBox m={5}>
                    <MDBox
                      mx={2}
                      mt={-3}
                      py={3}
                      px={2}
                      variant="gradient"
                      bgColor="light"
                      borderRadius="lg"
                      coloredShadow="secondary"
                    >
                      <MDTypography variant="h6" color="black">
                        Dados do produto
                      </MDTypography>
                    </MDBox>
                    <MDBox m={3}>
                      <MDInput
                        type="text"
                        label="Nome"
                        name="productname"
                        size="large"
                        onChange={onChange}
                        required="true"
                        value={product.productname}
                        sx={{
                          m: 2,
                        }}
                      />

                      <MDInput
                        type="text"
                        label="Pre??o (R$)"
                        name="price"
                        onChange={onChange}
                        required="true"
                        value={product.price}
                        sx={{
                          m: 2,
                        }}
                      />

                      <MDInput
                        type="text"
                        label="Descri????o"
                        name="description"
                        onChange={onChange}
                        required="true"
                        value={product.description}
                        sx={{
                          m: 2,
                        }}
                      />

                      <MDInput
                        type="text"
                        label="Informa????es t??cnicas"
                        name="technicalinformation"
                        onChange={onChange}
                        required="true"
                        value={product.technicalinformation}
                        sx={{
                          m: 2,
                        }}
                      />

                      <MDInput
                        type="number"
                        label="Quantidade"
                        name="quantity"
                        onChange={onChange}
                        required="true"
                        value={product.quantity}
                        sx={{
                          m: 2,
                        }}
                      />
                      <FormControl sx={{ p: 1, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label" >Se????o</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          labelr="Se????o"
                          name="sectionid"
                          value={product.sectionid}
                          onChange={onChange}
                          displayEmpty
                        >
                          <MenuItem value={0}>Selecione</MenuItem>

                          {sections.map((section) => (<MenuItem value={section.id}>{section.section_name}</MenuItem>))
                          }
                        </Select>
                      </FormControl>

                      <FormControl sx={{ p: 1, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label" >Situa????o</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          labelr="Situa????o"
                          name="active"
                          value={product.active}
                          onChange={onChange}
                          displayEmpty
                        >
                          <MenuItem value="">Selecione</MenuItem>
                          <MenuItem value="true">Ativo</MenuItem>
                          <MenuItem value="false">Inativo</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>

                  </MDBox>
                  <MDBox m={5} p={5}>
                    <MDButton type="submit" color="info">
                      Atualizar
                    </MDButton>
                    &nbsp;&nbsp;&nbsp;
                    <MDButton color="info" onClick={() => onCancel()}>Cancelar</MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FormEditProduct;
