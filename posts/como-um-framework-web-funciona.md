---
title: 'Entendendo como um framework web funciona'
date: '2025-12-26'
status: 'draft'
draftStartDate: '2025-12-26'
lastUpdated: '2025-12-26'
---

## Introdução

Um framework web é uma ferramenta que facilita o desenvolvimento de aplicações. Essa facilidade existe porque ele tem abstrações, ou soluções elegantes e genéricas que permitem nos concentrarmos na aplicação que estamos construindo sem ter que implementar detalhes que são comuns a toda aplicação web. Esse post é um exercício prático para entender de forma intuitiva e gradual como um framework web funciona.

### Problema 1 - Comunicação entre duas partes

Imagine que tenhamos uma função em Python que retorne a mensagem "Hey, como vai?".

```python
def main():
    return "Hey, como vai?"
```

Podemos simplesmente invocar a função e obter o resultado. Mas e se quiséssemos algo diferente: deixar a função rodando o tempo todo "escutando" qualquer chamada e só então retornar a mensagem? Como faríamos isso?

### Solução

```python
def main():
    while True:
        print("Escutando...")

if __name__ == "__main__":
    main()
```

Bem, agora temos uma função que roda eternamente. Porém, removemos a parte em que ela retorna a mensagem. O nosso desafio é: **fazer a função ficar escutando chamadas de qualquer um e sempre retornar a mensagem** "Hey, como vai?". Invocar uma função "parada" é simples. O que queremos invocar é uma "função" que está rodando. Isso é o que chamamos de **processo**.

Bem, agora que entendemos que chamar uma função rodando (processo) é diferente de chamar uma função parada, entendemos que precisamos de um **canal** para fazer a chamada. A ideia é bem simples: o processo se conecta nesse canal. Assim, quando queremos um retorno do processo, nos conectamos nesse canal e o obtemos. Vamos usar algo que você já conhece para criar esse canal: um arquivo.

```python
import os
import time

def main():
    while True:
        try:
            with open("channel.txt", "r") as f:
                message = f.read()
            
            # Lê chamada
            ...

            # Responde chamada
            ...
        except FileNotFoundError:
            pass
        
        time.sleep(0.1)

if __name__ == "__main__":
    main()
```

Agora, nossa função roda eternamente e também abre um arquivo como canal de comunicação. Para permitir essa comunicação, vamos definir que nossa função que responde é um **servidor** e quem pede a resposta é um **cliente**. Dessa forma, basta implementar uma regra para ler a chamada do cliente e então responder.

```python
# server.py
import os
import time

def main():
    while True:
        try:
            with open("channel.txt", "r") as f:
                message = f.read()
            
            if message.startswith("CLIENT:"):
                # Consome a mensagem (remove do arquivo)
                os.remove("channel.txt")
                
                # Responde
                with open("channel.txt", "w") as f:
                    f.write("SERVER: Hey, como vai?\n")
        except FileNotFoundError:
            pass
        
        time.sleep(0.1)

if __name__ == "__main__":
    main()
```

Nossa função que antes era "parada" agora fica escutando ativamente qualquer chamada feita &#x2014; rodando como um processo. Agora sim, um cliente pode chamar se comunicar com esse processo e receber a resposta.

```python
# client.py
import os
import time

# Escreve mensagem
with open("channel.txt", "w") as f:
    f.write("CLIENT: Olá!\n")

# Aguarda resposta
time.sleep(0.2)

# Lê resposta
with open("channel.txt", "r") as f:
    response = f.read()

print(response)

# Consome a resposta (remove do arquivo)
os.remove("channel.txt")
```

Note que na verdade o processo cliente que críamos se "conecta" ao arquivo. Quando ele escreve nesse arquivo, o processo servidor escuta e então escreve novamente no arquivo. O cliente por sua vez, lê novamente o arquivo, obtendo a resposta escrita pelo servidor. Após a comunicação terminar, "fechamos" o arquivo e o destruímos.

Como desafio, tente mudar o código para que o cliente passe dois números e o servidor retorne a soma deles.

### Problema 2 - Reaproveitar o canal de comunicação