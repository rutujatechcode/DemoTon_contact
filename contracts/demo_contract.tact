import "@stdlib/deploy";

contract DemoContract with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    Counter: Int as uint32;
    init() {
        self.Counter = 0;
    }
    recieve("increament"){
      self.Counter = self.counter + 1;  
    };

    get fun Counter( ): Int{
        return self.Counter;
    }
}
