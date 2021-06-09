// create a new instanse of our speech recognition interface
const recognition = new SpeechRecognition()

// configure speech recognition list
const speechRecognitionList = new SpeechGrammarList()
const grammar =
  '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
speechRecognitionList.addFromString(grammar, 1)

// config recognition with our grammar
recognition.grammars = speechRecognitionList
recognition.continuous = !!1 // false -- return result once, true -- return continuously
recognition.lang = 'en-US' // config the language of SR (defaults to html attr lang or to the lang of the user agent)
recognition.interimResults = false // yield results, that are not final?
recognition.maxAlternatives = 1 // how many variants of recognition does one result need to have?

const diagnostic = document.querySelector('.output')
const bg = document.querySelector('html')

bg.addEventListener('click', (e) => {
  console.log('click')
  recognition.start()
  diagnostic.textContent = 'Awaiting color command...'
})

recognition.addEventListener('audiostart', (e) => {
  console.log('started capturing audio')
})

recognition.addEventListener('audioend', (e) => {
  console.log('finished capturing audio, results: ')
  const results = recognition.stop()
  console.log(results)
  recognition.abort()
})

recognition.addEventListener('end', (e) => {
  console.log('recognition service disconnected!')
  console.log(e)
})

recognition.addEventListener('error', (e) => {
  console.log('speech recognition error!')
  console.log(e)
})

recognition.addEventListener('nomatch', (e) => {
  console.log('no match found...')
  console.log(e)
})

recognition.addEventListener('soundstart', (e) => {
  console.log('sound registered')
  console.log(e)
})

recognition.addEventListener('soundend', (e) => {
  console.log('sound lost detection')
  console.log(e)
})

recognition.addEventListener('speechstart', (e) => {
  console.log('speech detected')
  console.log(e)
})

recognition.addEventListener('speechend', (e) => {
  console.log('speech lost detection')
  console.log(e)
})

recognition.addEventListener('start', (e) => {
  console.log('recognition started')
  console.log(e)
})

recognition.addEventListener('result', (e) => {
  console.log('recognition result')
  console.log(e)
  recognition.stop()
  const color = e.results[0][0].transcript
  diagnostic.textContent = `Result received: ${color}`
  bg.style.backgroundColor = color
})
