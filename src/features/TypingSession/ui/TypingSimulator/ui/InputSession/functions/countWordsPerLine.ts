export function countWordsPerLine(text: string | undefined, charWidth: number) {
    // Разделяем текст на отдельные слова
    const words = text?.split(/\s+/)

    // Инициализируем переменные для подсчета количества слов в каждой строке
    const wordsPerLine = []

    // Инициализируем переменную для хранения текущей ширины строки
    let lineWidth = 0
    let lineWords = 0

    // Проходимся по каждому слову
    words?.forEach((word) => {
        // Вычисляем ширину текущего слова
        const wordWidth = word.length * charWidth + charWidth

        // Если добавление текущего слова приводит к превышению ширины строки, сохраняем количество слов в текущей строке и сбрасываем счетчик слов и ширину строки
        if (lineWidth + wordWidth > 1111) {
            wordsPerLine.push(lineWords)
            lineWords = 1
            lineWidth = wordWidth
        } else {
            // Иначе добавляем ширину текущего слова к ширине строки и увеличиваем счетчик слов
            lineWidth += wordWidth
            lineWords += 1
        }
    })

    // Учитываем последнее слово и строку
    wordsPerLine.push(lineWords)

    for (let i = 1; i < wordsPerLine.length; i+=1) {
        wordsPerLine[i] += wordsPerLine[i - 1];
    }

    // Возвращаем массив с количеством слов в каждой строке
    return wordsPerLine
}