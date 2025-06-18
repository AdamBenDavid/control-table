// src/App.tsx
import React from 'react';
import {DeploymentTable} from "./DeploymentPointTable/Table/DeploymentTable.tsx";
import {mockDeploymentPoints} from "./DeploymentPointTable/mockData.ts";

const App: React.FC = () => {

    return (
        <div
            dir="rtl"
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div
                dir="rtl"
                style={{
                    width: '75%',
                    maxHeight: '65vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <DeploymentTable data={mockDeploymentPoints} onDelete={() => {
                }}/>
            </div>
        </div>
    );
};


export default App;
