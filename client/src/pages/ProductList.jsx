import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const sizes = [
  "UK-3",
  "UK-4",
  "UK-5",
  "UK-6",
  "UK-7",
  "UK-8",
  "UK-9",
  "UK-10",
  "UK-11",
  "UK-12",
];
const colours = ["white", "black", "red", "blue", "yellow", "green"];

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const formatTitle = (category) => {
    const formatted = category.split("-").map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formatted.join(" ");
  };

  return (
    <Container>
      <Navbar />
      <Banner />
      <Title>{category ? formatTitle(category) : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="colour" onChange={handleFilters}>
            <Option disabled selected>
              Color
            </Option>
            {colours.map((colour) => (
              <Option>{colour}</Option>
            ))}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            {sizes.map((size) => (
              <Option>{size}</Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
