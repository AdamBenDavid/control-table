// src/App.tsx
import React from 'react';
import {DeploymentTable} from "./ControlTable/DeploymentTable.tsx";
import {mockDeploymentPoints} from "./ControlTable/mockData.ts";

const App: React.FC = () => {

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '65%',
                maxHeight: '65vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <DeploymentTable data={mockDeploymentPoints} onDelete={() => {
                }} onEdit={() => {
                }}/>
            </div>
        </div>
    );
};


export default App;
