#Requires AutoHotkey v2.0

readValue(startX, startY, endX, endY) {

    imageMap := Map(
        "0", {image: "0.bmp"},
        "1", {image: "1.bmp"},
        "2", {image: "2.bmp"},
        "3", {image: "3.bmp"},
        "4", {image: "4.bmp"},
        "5", {image: "5.bmp"},
        "6", {image: "6.bmp"},
        "7", {image: "7.png"},
        "8", {image: "8.bmp"},
        "9", {image: "9.png"}
    )

    foundCharacter := []  ; Initialize an empty array.
    resultString := ""  ; Initialize the result string.
    
    for key, value in imageMap {
        currentX := startX  ; Reset search start position for each character.
        filePath := NUMBER_IMAGE_FOLDER value.image ; Construct the file path for each image.
        
        if not FileExist(filePath)
            return -1

        ; Loop to keep matching until no match is found.
        while true {
            if ImageSearch(&foundX, &foundY, currentX, startY, endX, endY, "*TransFF00FF " filePath) {
                foundCharacter.Push([key, foundX])  ; Store the character and its foundX in the array.
                currentX := foundX + 1  ; Move the search start position to the right of the found image.
            } else {
                break  ; Exit the loop if no match is found.
            }
        }
    }

    while foundCharacter.Length > 0 {
        minIndex := 1
        for i, pair in foundCharacter {
            if pair[2] < foundCharacter[minIndex][2] {
                minIndex := i
            }
        }

        resultString .= foundCharacter[minIndex][1]

        foundCharacter.RemoveAt(minIndex)
    }

    if IsInteger(resultString)
        return resultString
    else
        return -1
}