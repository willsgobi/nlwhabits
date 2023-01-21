import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {

    const [title, setTitle] = useState<string>('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                return Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a periodicidade!")
            }

            await api.post('habits', {
                title,
                weekDays
            })

            setTitle('')
            setWeekDays([])

            Alert.alert("Novo hábito", "Hábito criado com sucesso!")
        }
        catch (e) {
            console.log(e)
            Alert.alert("Ops", "Não foi possível criar o novo hábito.")
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput value={title} onChangeText={setTitle} placeholder="Exercícios, dormir 8h, etc..." className="h-12 pl-4 rounded-lg mt-3 border-2 border-zinc-800 bg-zinc-900 text-white focus:border-green-600" placeholderTextColor={colors.zinc[400]} />
                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    availableWeekDays.map((week, index) => {
                        return <CheckBox key={week} checked={weekDays.includes(index)} title={week} onPress={() => handleToggleWeekDay(index)} />
                    })
                }

                <TouchableOpacity onPress={handleCreateNewHabit} activeOpacity={.7} className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather name="check" size={20} color={colors.white} />
                    <Text className="font-semibold text-base text-white ml-2 ">Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}