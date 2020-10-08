import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useHistory } from "react-router";

interface DetailsProps {}

const Details: React.FC<DetailsProps> = () => {
  const history = useHistory();
  const [text, setText] = useState<string>("");
  // Replace this with however you manage your form state
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const unblock = history.block(() => {
      if (isDirty) {
        return "You have unsaved changes, are you sure you want to leave?";
      }
    });
    return () => unblock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  // We use the ion lifecycle events here to properly set isDirty based
  // on if the component sticks around between page views or not
  useIonViewWillEnter(() => {
    setIsDirty(!!text);
  }, [text]);

  useIonViewWillLeave(() => {
    setIsDirty(false);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {JSON.stringify(isDirty)}
        <IonList>
          <IonItem>
            <IonInput
              value={text}
              placeholder="Name"
              onIonChange={(e) => {
                setText(e.detail.value!);
                setIsDirty(!!e.detail.value);
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton
          expand="block"
          onClick={() => {
            setText("");
            setIsDirty(false);
          }}
        >
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Details;
