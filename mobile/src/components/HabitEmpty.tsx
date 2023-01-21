import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitEmpty() {
    const { navigate } = useNavigation()

    return (
        <Text className="text-zinc-400 text-base">
            Você ainda não está monitorando nenhum hábito {' '}

            <Text onPress={() => navigate('new')} className="text-violet-400 text-base underline active:text-violet-500">
                Crie uma rotina agora mesmo
            </Text>
        </Text>
    )
}