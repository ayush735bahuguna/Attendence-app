import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

const DialogComponent = ({ trigger, title, content, handlertext, onPressHandler }) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false)
        onPressHandler();
    };

    return (
        <View>
            <TouchableOpacity onPress={showDialog}>{trigger}</TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{content}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>{handlertext}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View >
    );
};

export default DialogComponent;