import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RewardTable } from "./components/RewardTable";

function App() {
  return (
    <ChakraProvider>
      <Container maxW={"container.xl"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/1" />} />
            <Route path=":currentMonth" element={<RewardTable />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ChakraProvider>
  );
}

export default App;
