

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$input = json_decode( file_get_contents('php://input') );

abstract class Product {
    protected $sku;
    protected $name;
    protected $price;
    protected $attr;

    public function getSKU(): string {
        return $this->sku;
    }

    public function setSKU(string $sku): void {
        $this->sku = $sku;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getAttr(): string {
        return $this->attr;
    }

    public function setAttr(string $sku): void {
        $this->attr = $attr;
    }

    abstract public function displayAttributes(): string;



    public function saveProduct($data): bool {
        $sql = "INSERT INTO products (sku, name, price, type, attr) VALUES (:sku, :name, :price, :type, :attr)";
        $objDb = new DbConnect;
        $conn = $objDb->connect();
        $stmt = $conn->prepare($sql);

        $input = json_decode( file_get_contents('php://input') );
        $class = $input->type;
        $data = new $class($input->attr);

   
        $data->setName($input->name);
        $data->setSKU($input->sku);
        $data->setPrice($input->price);

        $result = $stmt->execute([
            "sku" => $data->getSKU(),
            "name" => $data->getName(),
            "price" => $data->getPrice(),
            "type" => $class,
            "attr" => $data->getAttr()
        ]);

        return $result;
    }
    
}


class Book extends Product {
    protected $weight;

    function __construct($attr) {
        $this->weight = $attr->weight;
        $this->attr = "Weight: " . $attr->weight . " kg";
      }

    public function getWeight(): float {
        return $this->weight;
    }

    public function setWeight(float $weight): void {
        $this->weight = $weight;
    }

    public function displayAttributes(): string {
        return "Weight: " . $this->weight . " kg";
    }
}

class DVD extends Product {
    protected $size;

    function __construct($attr) {
        $this->size = $attr->size;
        $this->attr = "Size: " . $attr->size . " MB";
      }

    public function getSize(): float {
        return $this->size;
    }

    public function setSize(float $size): void {
        $this->size = $size;
    }

    public function displayAttributes(): string {
        return "Size: " . $this->size . " MB";
    }
}

#[AllowDynamicProperties]
class Furniture extends Product {
    protected $height;
    protected $width;
    protected $length;

    function __construct($attr) {
        $this->height = $attr->height;
        $this->width = $attr->width;
        $this->lenght = $attr->lenght;
        $this->attr = "Dimensions: " . $attr->height . "x" . $attr->width . "x" . $attr->lenght . " cm";
      }
   

    public function getHeight(): float {
        return $this->height;
    }

    public function setHeight(float $height): void {
        $this->height = $height;
    }

    public function getWidth(): float {
        return $this->width;
    }

    public function setWidth(float $width): void {
        $this->width = $width;
    }

    public function getLength(): float {
        return $this->length;
    }

    public function setLength(float $length): void {
        $this->length = $length;
    }

    public function displayAttributes(): string {
        return "Dimensions: " . $this->height . "x" . $this->width . "x" . $this->length . " cm";
    }
}



$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        

        echo json_encode($products);
        break;
    case "POST":
        $class = $input->type;
        $data = new $class($input->attr);
       
        try {
            if($data->saveProduct($data)) {
            $response = ['status' => 1, 'message' => 'success'];
            echo json_encode($response); 
        } 

        } catch (PDOException $e) {
            if ($e->getCode() === "23000") {
                echo json_encode("SKU already exists");
            }
        }
           
        break;


    case "HEAD":
       
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $ids = $path[3];
        $sql = "DELETE FROM products WHERE id IN". $ids;
        $stmt = $conn->prepare($sql);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'delete success.'];
        } else {
            $response = ['status' => 0, 'message' => 'delete failed.'];
        }
        echo json_encode($response);
        break;
}


?>