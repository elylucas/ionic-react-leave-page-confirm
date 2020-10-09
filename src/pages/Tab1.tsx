import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
} from '@ionic/react';
import './Tab2.css';
import { Prompt } from 'react-router';

const Tab1: React.FC = () => {
  const [text, setText] = useState('');

useEffect(() => {
  if (text) {
    window.onbeforeunload = () => true;
  }
  return () => {
    window.onbeforeunload = null;
  };
}, [text]);

  useIonViewWillLeave(() => {
    setText('');
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonInput
          value={text}
          placeholder="Name"
          onIonChange={(e) => {
            setText(e.detail.value!);
          }}
        ></IonInput>

        <IonButton
          expand="block"
          onClick={() => {
            setText('');
          }}
        >
          Submit
        </IonButton>
        <Prompt
          when={!!text}
          message="You have unsaved changes, are you sure you want to leave?"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
