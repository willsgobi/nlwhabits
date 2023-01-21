import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

interface Props extends TouchableOpacityProps {
    title: string
    checked?: boolean,
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} activeOpacity={.7} className="flex-row mb-2 items-center">
            {
                checked ? <Animated.View exiting={ZoomOut} entering={ZoomIn} className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
                    <Feather name="check" size={20} color={colors.white} />
                </Animated.View> : <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
            }

            <Text className="text-white ml-3 text-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    )
}