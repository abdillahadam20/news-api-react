import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #f0f2f4;
  height: 64px;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 64px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #111418;
`;

const StyledMenu = styled(Menu)`
  border-bottom: none;
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 4px 12px;
  color: #111418;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuScrollWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

type NewsSource = {
  category: string;
};

type NavbarProps = {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
};

const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    let resizeTimer: number;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setIsMobile(checkIsMobile());
      }, 100);
    };

    setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);

    const forceCheck = window.setTimeout(() => {
      setIsMobile(checkIsMobile());
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(forceCheck);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${import.meta.env.VITE_NEWS_API_URL}/sources?apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`;
        const response = await axios.get(url);

        const sources = response.data.sources as NewsSource[];
        const uniqueCategories = Array.from(
          new Set(sources.map((source) => source.category))
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (e: { key: string }) => {
    onSelectCategory(e.key);
    if (isMobile) setDrawerVisible(false);
  };

  // Buat menuItems dan tandai item aktif dengan selectedCategory
  const menuItems = categories.map((cat) => ({
    key: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    style: {
      color: "#111418",
      fontWeight: selectedCategory === cat ? "bold" : 500,
    },
  }));

  return (
    <MenuScrollWrapper>
      <StyledHeader>
        <LogoWrapper>
          {/* Logo SVG & Title */}
          <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.578 8.578C5.528 11.628 3.451 15.515 2.609 19.745C1.768 23.976 2.2 28.361 3.851 32.346C5.501 36.331 8.297 39.738 11.883 42.134C15.47 44.531 19.686 45.81 24 45.81C28.313 45.81 32.530 44.531 36.117 42.134C39.703 39.738 42.499 36.331 44.149 32.346C45.8 28.361 46.232 23.976 45.391 19.745C44.549 15.515 42.472 11.628 39.422 8.578L24 24L8.578 8.578Z" />
          </svg>
          <Title>News Today</Title>
        </LogoWrapper>

        {isMobile ? (
          <HamburgerButton onClick={() => setDrawerVisible(true)}>
            <MenuOutlined />
          </HamburgerButton>
        ) : (
          <StyledMenu
            mode="horizontal"
            selectable={false}
            items={menuItems}
            onClick={handleCategoryClick}
            selectedKeys={[selectedCategory]} // Highlight kategori aktif
          />
        )}
      </StyledHeader>

      <Drawer
        title="Categories"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectable={false}
          items={menuItems}
          onClick={handleCategoryClick}
          selectedKeys={[selectedCategory]} // Highlight kategori aktif di drawer juga
        />
      </Drawer>
    </MenuScrollWrapper>
  );
};

export default Navbar;
