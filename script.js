// Inisialisasi bobot dengan nilai default
let bobot = [0, 0, 0];

// Fungsi untuk menghitung keluaran
function keluaran(input, bobot) {
    let hasil = bobot[0];
    for (let i = 1; i < 3; i++) {
        hasil += input[i] * bobot[i];
    }
    return (hasil >= 0) ? 1 : 0;
}

// Fungsi untuk mengacak bobot
function randomizeWeights() {
    bobot = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
    document.getElementById("b1").innerText = bobot[0].toFixed(2);
    document.getElementById("w1").innerText = bobot[1].toFixed(2);
    document.getElementById("w2").innerText = bobot[2].toFixed(2);
}

// Fungsi untuk melatih perceptron
function trainPerceptron() {
    // Ambil nilai miu dari input pengguna
    const miu = parseFloat(document.getElementById('miu').value);

    // Inisialisasi input dan target
    const input = [
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1]
    ];
    const target = [0, 0, 0, 1];
    let errorFlag;
    let epoch = 1;  // Mulai epoch dari 1
    let epochsData = [];

    do {
        errorFlag = false;
        let epochData = [];
        for (let i = 0; i < 4; i++) {
            const output = keluaran(input[i], bobot);
            const error = target[i] - output;
            epochData.push({ input: input[i], output: output, error: error });

            if (error !== 0) {
                errorFlag = true;
                for (let j = 0; j < 3; j++) {
                    bobot[j] += miu * error * input[i][j];
                }
            }
        }
        epochsData.push({ epoch: epoch, epochData: epochData, bobot: [...bobot] });
        epoch++;
    } while (errorFlag);

    // Output hasil
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = '';

    // Tampilkan semua epoch
    epochsData.forEach((data) => {
        let epochTable = `<h3>Epoch ${data.epoch}</h3>`;
        epochTable += `<table><tr><th>x1</th><th>x2</th><th>Output</th><th>Error</th><th>b1</th><th>w1</th><th>w2</th></tr>`;
        data.epochData.forEach((ed) => {
            epochTable += `<tr>
                            <td>${ed.input[1]}</td>
                            <td>${ed.input[2]}</td>
                            <td>${ed.output}</td>
                            <td>${ed.error}</td>
                            <td>${data.bobot[0].toFixed(2)}</td>
                            <td>${data.bobot[1].toFixed(2)}</td>
                            <td>${data.bobot[2].toFixed(2)}</td>
                          </tr>`;
        });
        epochTable += `</table>`;
        outputDiv.innerHTML += epochTable;
    });

    //Tampilkan hasil yakni jumlah epoch dan bobot akhir
    outputDiv.innerHTML += `<h3>Hasil</h3>
                            <p>Jumlah Epoch: ${epoch - 1}</p>
                            <p>Bobot Akhir:</p>
                            <table>
                            <tr><th>b1</th><th>w1</th><th>w2</th></tr>
                            <tr>
                            <td>${bobot[0].toFixed(2)}</td>
                            <td>${bobot[1].toFixed(2)}</td>
                            <td>${bobot[2].toFixed(2)}</td>
                            </tr>
                            </table>`;
}

// Fungsi untuk mereset tampilan
function reset() {
    document.getElementById('miu').value = 0.1;
    bobot = [0, 0, 0];
    document.getElementById("b1").innerText = '0.00';
    document.getElementById("w1").innerText = '0.00';
    document.getElementById("w2").innerText = '0.00';
    document.getElementById("output").innerHTML = `
        <p style="margin-top: 0;"><strong>Jaringan Syaraf Tiruan (JST)</strong> adalah sistem komputasi yang terinspirasi oleh jaringan saraf biologis dalam otak manusia. JST digunakan untuk mengenali pola dan melakukan tugas-tugas prediksi berdasarkan data yang diberikan. JST terdiri dari beberapa lapisan neuron, termasuk lapisan input, lapisan tersembunyi, dan lapisan output. Setiap neuron terhubung dengan neuron lain melalui sinapsis yang memiliki bobot, yang diperbarui selama proses pelatihan.</p>
        <p><strong>Studi Kasus: Logika AND</strong></p>
        <p>Logika AND adalah operasi logika dasar yang menghasilkan nilai benar (1) hanya jika kedua operandnya juga bernilai benar (1). Jika salah satu atau kedua operand bernilai salah (0), maka hasil dari operasi AND adalah salah (0). Dalam konteks JST, kita dapat melatih perceptron sederhana untuk mempelajari fungsi logika AND. Perceptron ini akan menggunakan bobot dan bias untuk mengklasifikasikan input (x1, x2) ke dalam output yang benar sesuai dengan tabel kebenaran logika AND.</p>
        <p>Aplikasi ini dimaksudkan sebagai alat uji coba Jaringan Syaraf Tiruan dengan menggunakan studi kasus Logika AND sebagai patokan hasil. Disini akan dibuktikan bahwa target dari logika AND akan sesuai dengan hasil dari training perceptron JST. Dengan inputan berupa learning rate dan bobot dari bias, input 1 (x1), dan input 2 (x2) yang diacak. Hasil dari training perceptron nantinya berupa jumlah epoch serta tabel akhir dari bobot yang telah ditraining. Untuk mulai melakukan uji coba, <strong>silahkan konfigurasi input data di samping kiri!.</strong></p>
        <p style="text-align: end; padding-top: 20px;"><i>By: Muhammad Asyraf_22081010107_KCB C</i></p>
    `;
}
