# File Select

## Installation
`npm install @aslamhus/fileselect`

## Usage
    import FileSelect from 'fileselect'
    const fileSelect = new FileSelect()
    fileSelect.select()

## Specify which file types are allowed
    let allowedTypes = "['image/jpeg','application/pdf']"
    const fs = new FileSelect(allowedTypes)
    // OR
    const fs = new FileSelect()
    fs.allowedTypes = ['image/jpeg','application/pdf']
### Allow all file types
    allowedTypes = "*"
### Allow all image types
    allowedTypes = "image/*"
### Allow all video types
    allowedTypes = "video/*" 
### Allow multiple types
    allowedTypes = ['image/jpeg','image/png','video/mp4']

## Tests
    `npm test`
