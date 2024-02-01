import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const ModalComponent = ({ trigger, content, title }) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 15 };

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text className='text-xl mb-4'>{title}</Text>
                    {content}
                </Modal>
            </Portal>
            <TouchableOpacity onPress={showModal}>
                {trigger}
            </TouchableOpacity>
        </>
    );
};

export default ModalComponent;