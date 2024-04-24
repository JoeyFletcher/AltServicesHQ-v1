// src/components/Home.js
import React from 'react';
import styled from 'styled-components';

// Styled component definitions
const Intro = styled.div`
    background: linear-gradient(135deg, #1c92d2, #f2fcfe);
    color: #fff;
    padding: 40px 20px;
    text-align: center;
    border-bottom: 5px solid #0c6170;
`;

const Features = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 40px 0;
`;

const FeatureItem = styled.li`
    background: white;
    margin: 0 10px;
    padding: 20px;
    flex: 1;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-radius: 5px;
    text-align: center;
    font-size: 1.1rem;
`;

const CTA = styled.div`
    background-color: #4c669f;
    color: white;
    padding: 20px;
    text-align: center;
    font-size: 1.2rem;
`;

const Button = styled.button`
    background-color: #22a6b3;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0c6170;
    }
`;

// Component definition
function Home() {
    return (
        <div>
            <Intro>
                <h1>Welcome to Your Investor Portal</h1>
                <p>Streamline your investment management processes with cutting-edge technology designed for today's fund managers.</p>
            </Intro>
            <Features>
                <FeatureItem>Real-Time Dashboard</FeatureItem>
                <FeatureItem>Secure Investment</FeatureItem>
                <FeatureItem>24/7 Support</FeatureItem>
            </Features>
            <CTA>
                <h2>Ready to take control of your investments?</h2>
                <Button>Join Now</Button>
            </CTA>
        </div>
    );
}

export default Home;
