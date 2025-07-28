<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>IZVEŠTAJ</title>

<style>
    body {
        font-family: 'DejaVu Sans', sans-serif;
        font-size: 12px;
        margin: 20px;
    }

    h2 {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        border: 1px solid #000;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
</style>

</head>
<body>
    <h2>IZVEŠTAJ AKTIVNOSTI</h2>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Korisnik</th>
                <th>Uređaj</th>
                <th>Tip</th>
                <th>Akcija</th>
                <th>Vreme izvršavanja</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($logs as $log)
                <tr>
                    <td>{{ $log->id }}</td>
                    <td>{{ $log->user->name ?? 'Nepoznato' }}</td>
                    <td>{{ $log->device->name ?? 'Nepoznato' }}</td>
                    <td>{{ $log->device->type ?? 'Nepoznato' }}</td>
                    <td>{{ $log->action }}</td>
                    <td>{{ \Carbon\Carbon::parse($log->performed_at)->format('d.m.Y H:i') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>